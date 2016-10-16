Rails.application.routes.draw do
  root 'sites#index'
  namespace :api do
    resources :sites
  end

  resources :sites
end
