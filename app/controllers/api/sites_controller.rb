class Api::SitesController < ApiController
  def index
    sites = Site.all
    render json: { sites: sites, user: current_user }, status: :ok
  end
end
