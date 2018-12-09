class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :active_relationships, class_name: 'Relationship', foreign_key: 'from_user_id', dependent: :destroy
  has_many :passive_relationships, class_name: 'Relationship', foreign_key: 'to_user_id', dependent: :destroy
  has_many :to_users, through: :active_relationships, source: :to_user
  has_many :from_users, through: :passive_relationships, source: :from_user
  has_many :messages, dependent: :destroy

  def relationship(other_user)
    to_users << other_user
  end

  def destroy_relationship(other_user)
    active_relationships.find_by(to_user_id: other_user.id).destroy
  end

  def relationship?(other_user)
    to_users.include?(other_user)
  end
end
