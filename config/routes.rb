Rails.application.routes.draw do
  devise_for :users
  root 'sites#index'

  namespace :api do
    resources :sites do
      resources :teams
    end
    resources :volunteers
  end

  resources :sites
end
