# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  author_id  :bigint           not null
#  post_id    :bigint           not null
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Comment < ApplicationRecord
    validates :body, presence:true

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User
    belongs_to :post

    has_many :likes, 
        as: :likeable,
        class_name: :Like,
        dependent: :destroy
    
end
