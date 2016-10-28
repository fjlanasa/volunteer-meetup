class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :max_milage, presence: true
  validates :phone_number, presence: true
  validates_inclusion_of :labor, in: [true, false]
  validates :supplies, numericality: {greater_than_or_equal_to: 0}

  has_many :sites, dependent: :destroy
  has_many :posts, dependent: :destroy
  has_many :signups, dependent: :destroy
  has_many :teams, through: :signups
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  def full_name
    "#{first_name} #{last_name}"
  end
end
