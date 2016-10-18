class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :phone_number, presence: true
  validates :phone_number, format: { with: /\A[0-9]{3}-[0-9]{3}-[0-9]{4}\z/, message: 'must be in format ###-###-####' }
  has_many :sites
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  after_create do
    Volunteer.create(user_id: id, labor: false, supplies: false)
  end

  def full_name
    "#{first_name} #{last_name}"
  end
end
