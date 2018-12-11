class Message < ActiveRecord::Base
  belongs_to :relationship
  belongs_to :user
  mount_uploader :picture, ImageUploader
  scope :relationships, -> (from_relationship, to_relationship) { where(relationship_id: [from_relationship.id, to_relationship.id]) }
end
