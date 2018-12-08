module Api
  class MessagesController < ApplicationController

    def index
      from_relationship = Relationship.find_by(from_user_id: current_user.id, to_user_id: params[:to_user_id])
      to_relationship = Relationship.find_by(from_user_id: params[:to_user_id], to_user_id: current_user.id)
      @messages = Message.where(relationship_id: [from_relationship.id, to_relationship.id])
      render json: @messages
    end

    def create
      @message = Message.create(message_params)
      render json: @message
    end

    private
    def message_params
      params.permit(:contents, :picture, :user_id, :relationship_id)
    end
  end
end
