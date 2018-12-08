Rails.application.routes.draw do
  devise_for :users
  namespace :api, { format: 'json' } do
    resources :messages
    resources :search
    resources :relationships
    resources :users
  end
  root 'messages#index'
  resources :users, only: [:edit, :update, :show]
  resources :users do
    member do
      get :to_users, :from_users
    end
  end
end
