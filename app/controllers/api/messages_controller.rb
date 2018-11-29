module Api
  class MessagesController < ApplicationController

    def index
      @messages = Message.first
      render json: @messages
    end

    def create
      @message = Message.create(message_params)
      render json: @message
    end

    private
    def message_params
      params.permit(:contents, :from, :to, :picture, :timestamp)
    end
  end
end
