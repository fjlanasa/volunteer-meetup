class Site < ActiveRecord::Base
  validates :location :presence: true
end
