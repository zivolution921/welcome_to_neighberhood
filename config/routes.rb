Rails.application.routes.draw do
  resources :favorites
  root 'application#index'
  get '*path' => 'application#index'
end
