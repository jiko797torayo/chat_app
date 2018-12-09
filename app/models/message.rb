class Message < ActiveRecord::Base
  belongs_to :relationship
  belongs_to :user
end
