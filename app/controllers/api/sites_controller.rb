class Api::SitesController < ApiController
  def index
    sites = Site.all
    render json: { sites: sites }, status: :ok
  end
end
