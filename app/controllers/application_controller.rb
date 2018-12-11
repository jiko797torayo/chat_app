class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  private

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end

  def get_current_user_relationships
    @current_user_relationships = Relationship.where(from_user_id: current_user.id)
  end

  def get_already_relationship_users
    @already_relationship_users = []
    @current_user_relationships.each do |relationship|
      @already_relationship_users << relationship.to_user_id
    end
  end
end
