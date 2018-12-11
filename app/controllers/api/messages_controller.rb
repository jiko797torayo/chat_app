module Api
  class MessagesController < ApplicationController
    before_action :get_relationships

    def index
      @messages = Message.relationships(@from_relationship, @to_relationship)
      render json: @messages
    end

    def create
      params.store('user_id', current_user.id)
      params.store('relationship_id', @from_relationship.id)
      Message.create(message_params)
      @messages = Message.relationships(@from_relationship, @to_relationship)
      render json: @messages
    end

    private

    def message_params
      params.permit(:contents, :picture, :user_id, :relationship_id)
    end

    def get_relationships
      @from_relationship = Relationship.from_to(current_user.id, params[:to_user_id])
      @to_relationship = Relationship.from_to(params[:to_user_id], current_user.id)
    end
  end
end
