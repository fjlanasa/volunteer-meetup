Rails.application.routes.draw do
  devise_for :users
  root 'sites#index'

  namespace :api do
    resources :sites do
      resources :teams, only: [:show]
    end
    resources :volunteers
    resources :teams
    resources :signups
    resources :posts
  end

  resources :sites, only: [:index]

  match '*path' => 'sites#index', via: :get
end
