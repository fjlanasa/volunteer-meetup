class Api::SitesController < ApiController
  include SiteHelper
  def index
    sites = Site.all
    user = current_user
    if !user.nil?
      user_sites = Site.where(user_id: user.id).reverse
    else
      user_sites = []
    end
    render json: { sites: sites, user: user, user_sites: user_sites}, status: :ok
  end

  def create
    site = Site.new(site_params)
    if site.save
      site.lat = site.geolocate['lat']
      site.lng = site.geolocate['lng']
      formatted_address = site.formatted_address
      site.static_map_url = get_map_url(site.lat, site.lng, formatted_address)
      site.save
    else

    end
  end

  def show
    site = Site.find(params[:id])
    team = site.team
    creator = User.find(site.user_id)
    if !team.nil?
      organizer = User.find(team.organizer_id)
      team_members = team.users
    else
      organizer = nil
      team_members = nil
    end
    user = current_user
    if !user.nil?
      if !team.nil?
        if team.users.any? {|vol| vol.id == user.id}
          member = true
        else
          member = false
        end
      end
    end
    render json: {site: site, user: user, team: team, team_members: team_members,
      organizer: organizer, member: member, creator: creator}, status: :ok
  end

  def destroy
    site = Site.find(params[:id])
    site.destroy
    head :no_content
  end

  private
  def site_params
    params.require(:site).permit(:location, :contact_name, :contact_phone, :square_footage, :special_details, :user_id)
  end
end
