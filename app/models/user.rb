class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :max_milage, presence: true
  validates :phone_number, presence: true
  validates :phone_number, format: { with: /\A[0-9]{3}-[0-9]{3}-[0-9]{4}\z/, message: 'must be in format ###-###-####' }
  validates_inclusion_of :labor, in: [true, false]
  validates_inclusion_of :supplies, in: [true, false]

  has_many :sites
  has_many :signups, dependent: :destroy
  has_many :teams, through: :signups
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  def full_name
    "#{first_name} #{last_name}"
  end
end
