Rails.application.routes.draw do
  devise_for :users
  root to: 'groups#index'
  resource :user, only: [:edit, :update]
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
      namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end
  end
  resources :users do
    collection do
      get 'search'
    end
  end
end
