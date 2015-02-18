class PlaylistsController < ApplicationController
  respond_to :html, :js, :xml, :json

  def index

  end

  def new
    @playlist = Playlist.new

    render 'new', layout: false
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
      render 'show', layout: false
    else
      render :new, layout: false
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
    @current_users_around = current_users_around
  end

end
