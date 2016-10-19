class Api::SitesController < ApiController
  include SiteHelper
  def index
    sites = Site.all
    user = current_user
    user_sites = Site.where(user_id: user.id).reverse
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
    user = current_user
    if !user.nil?
      volunteer = Volunteer.find(user.id)
      if !team.nil?
        if team.volunteers.any? {|vol| vol.id == volunteer.id}
          member = true
        else
          member = false
        end
      end
    else
      volunteer = nil
    end
    render json: {site: site, user: user, volunteer: volunteer, team: team, member: member}, status: :ok
  end

  private
  def site_params
    params.require(:site).permit(:location, :contact_name, :contact_phone, :square_footage, :special_details, :user_id)
  end
end
