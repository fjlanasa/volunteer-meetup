class Api::VolunteersController < ApiController
  def index
    render json: { message: 'hello' }, status: :ok
  end
end
