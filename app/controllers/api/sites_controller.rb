class Api::SitesController < ApiController
  include SiteHelper
  def index
    sites = Site.all
    render json: { sites: sites, user: current_user }, status: :ok
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

  private
  def site_params
    params.require(:site).permit(:location, :contact_name, :contact_phone, :square_footage, :special_details, :user_id)
  end
end
