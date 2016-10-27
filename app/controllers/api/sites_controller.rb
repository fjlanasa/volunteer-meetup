class Api::SitesController < ApiController
  include SiteHelper
  def index
    @sites = Site.all
    @user = current_user
    if !@user.nil?
      @user_sites = Site.where(user_id: @user.id).order(id: :desc)
    else
      @user_sites = []
    end
    render json: { sites: @sites, user: @user, user_sites: @user_sites}, status: :ok
  end

  def create
    site = Site.new(site_params)
    if site.save
      if !site.geolocate.nil?
        site.lat = site.geolocate['lat']
        site.lng = site.geolocate['lng']
        formatted_address = site.formatted_address
        site.static_map_url = get_map_url(site.lat, site.lng, formatted_address)
        site.save
      end
    else
      render json: {message: site.errors.full_messages[0]}
    end
  end

  def show
    site = Site.find(params[:id])
    team = site.team
    creator = User.find(site.user_id)
    user = current_user
    organizer = nil
    team_members = nil
    posts = []
    member = false
    signup = nil

    if !team.nil?
      organizer = User.find(team.organizer_id)
      team_members = team.users
      posts = Post.where(team_id: team.id).order(updated_at: :desc).to_a
      posts.map! {|post| post.attributes.merge({'user_name'=> User.find(post.user_id).full_name, 'team_site' => post.team.site})}
    end
    if !user.nil? && !team.nil?
      if team.users.any? {|vol| vol.id == user.id}
        member = true
      end
      signup = Signup.where(user_id: user.id, team_id: team.id)
      signup = signup[0]
    end
    render json: {site: site, user: user, team: team, team_members: team_members,
      organizer: organizer, member: member, creator: creator, signup: signup,
      posts: posts}, status: :ok
  end

  def destroy
    site = Site.find(params[:id])
    site.destroy
    render json: {message: 'Successfully deleted your request'}
  end

  private
  def site_params
    params.require(:site).permit(:location, :contact_name, :contact_phone, :square_footage, :special_details, :user_id)
  end
end
