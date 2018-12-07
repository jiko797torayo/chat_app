module Api
  class SearchController < ApplicationController
    def index
      already_relationship_users = [current_user.id]
      users = Relationship.where(from_user_id: current_user.id)
      users.each do |user|
        already_relationship_users << user.to_user_id
      end
      @search = User.where.not(id: already_relationship_users)
      render json: @search
    end
  end
end
