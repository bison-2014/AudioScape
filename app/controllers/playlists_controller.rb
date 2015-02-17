class PlaylistsController < ApplicationController

  def index

  end

  def new
    @playlist = Playlist.new

  end

  def show
    @playlist = Playlist.find(params[:id])
    @client = Grooveshark::Client.new({session: session[:groove_session]})
    @picture = @playlist.art_url
    unless @picture
      @picture = "http://1.bp.blogspot.com/-NFIeRN1TNpU/Ukou19njwHI/AAAAAAAAARQ/iypdhkQVZvI/s200/7313935-heavy-metal-rock-and-roll-devil-horns-hand-sign-with-a-black-leather-studded-bracelet.jpg"
    end
  end

  def create
    @playlist = Playlist.new(title: params[:playlist][:title], user_id: current_user.id, art_url: params[:playlist][:art_url])

    if @playlist.save
      redirect_to @playlist
    else
      render :new
    end
  end

  def destroy
    playlist = current_user.playlists.find(params[:id])
    playlist.destroy

    redirect_to '/'
  end

  def update

  end

  def find
    base_uri = 'https://blinding-fire-43.firebaseio.com/'
    firebase = Firebase::Client.new(base_uri)

    @users = User.all
    @current_users_around = []
    @users.each do |u|

      body = firebase.get("user#{u.id.to_s}").body
      current_user_body = firebase.get("user#{current_user.id.to_s}").body

      if body
        this_user_point = body['l']
        current_user_point = current_user_body['l']

        if 1.hour.ago < body['datetime'] || 1.hour.ago < u.updated_at

          if distance(current_user_point[0], current_user_point[1], this_user_point[0], this_user_point[1]) < 16
            @current_users_around << u unless u == current_user
          end
        end
      end
    end
  end




  def power(num, pow)
    num ** pow
  end

  def distance(lat1, long1, lat2, long2)
    dtor = Math::PI/180
    r = 6378.14

    rlat1 = lat1 * dtor
    rlong1 = long1 * dtor
    rlat2 = lat2 * dtor
    rlong2 = long2 * dtor

    dlon = rlong1 - rlong2
    dlat = rlat1 - rlat2

    a = power(Math::sin(dlat/2), 2) + Math::cos(rlat1) * Math::cos(rlat2) * power(Math::sin(dlon/2), 2)
    c = 2 * Math::atan2(Math::sqrt(a), Math::sqrt(1-a))
    d = r * c

    return d
  end
end
