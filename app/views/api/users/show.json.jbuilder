json.user do
    json.extract! @user, :id, :email, :first_name, :last_name, :gender, :birthday, :bio, :workplace, :school, :current_city, :hometown, :pronunciation, :created_at, :updated_at
    json.coverUrl @user.cover.attached? ? @user.cover.url : "https://facespace-fs-seeds.s3.amazonaws.com/surfing.jpg"
    json.avatarUrl @user.avatar.attached? ? @user.avatar.url : "https://facespace-fs-seeds.s3.amazonaws.com/profile_pic_default1.jpg"

    json.friends @user.friends do |friend|
      json.extract! friend, :id, :user_id, :friend_id, :status
    end
    
    json.friendRequests @user.friend_requests do |friendRequest|
      json.extract! friendRequest, :id, :user_id, :friend_id, :status
    end
    
    json.posts @user.posts.includes(:comments, :likes) do |post|
    
      json.set! post.id do
        json.extract! post, :id, :body, :author_id, :feed_id, :created_at, :updated_at
        json.photoUrl post.photo.attached? ? post.photo.url : nil
        json.likes post.likes
      end
      
      json.comments post.comments do |comment|
          json.extract! comment, :id, :body, :author_id, :post_id, :created_at, :updated_at
          json.likes comment.likes 
      end
    end
  end
  