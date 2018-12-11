module Api
  class SearchController < ApplicationController
    before_action :get_current_user_relationships
    before_action :get_already_relationship_users

    def index
      @already_relationship_users << current_user.id
      @search = User.where.not(id: @already_relationship_users)
      render json: @search
    end
  end
end
