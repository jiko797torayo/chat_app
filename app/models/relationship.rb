class Relationship < ActiveRecord::Base
  belongs_to :from_user, class_name: 'User'
  belongs_to :to_user, class_name: 'User'
  has_many :messages, dependent: :destroy
  validates :from_user_id, presence: true
  validates :to_user_id, presence: true
  scope :from_to, -> (from_user_id, to_user_id) { find_by(from_user_id: from_user_id, to_user_id: to_user_id) }
end
