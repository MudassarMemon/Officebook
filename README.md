# [Officebook](https://officebook-1.onrender.com/)

Officebook is a full-stack application inspired by Facebook and themed around NBC's 'The Office'. It is designed to replicate the essential features of a social media platform, such as posting, commenting, liking, and friend functionalities, all with a hint of the humor and style of 'The Office'.

**Click to visit the site:** [Officebook](https://officebook-1.onrender.com/)

Click **Demo User** on the login page to explore without signing up. The app runs on a free hosting tier, so the first load after a quiet period can take up to a minute.

### Technologies Used

- **Backend:** Ruby on Rails, PostgreSQL, JBuilder
  - Built on RESTful API principles ensuring standardized and predictable routes.
  - Incorporated advanced security measures, including BCrypt password encryption, backend validation, constraints, pre-authorizations, and CSRF authenticity tokens. Also implemented session-based authorization for persistent login status.
- **Frontend:** React and Redux
  - Emphasis on DRY (Don't Repeat Yourself) principles, modularity, and reusability of code. Efficient state management achieved through Redux.
- **Hosting:** Render (web service), Neon (PostgreSQL), and AWS S3 (image storage via Rails Active Storage)

### Feature highlights:

1. **User Authentication**
   
   - Users can seamlessly sign up, sign in, or use a demo login to experience the site without having to register. The authentication process ensures:
     - Age restriction during signup to maintain the site's decorum.
     - Certain functions can only be performed upon user verification.

  ![User Auth](https://github.com/MudassarMemon/Officebook/blob/main/storage/chrome_vb94ZF6CvS.gif)
  
   ```ruby
  def generate_unique_session_token
    loop do
      session_token = SecureRandom.urlsafe_base64
      return session_token unless User.exists?(session_token: session_token)
    end
  end
```

2. **Posts**

    - Users can create, view, edit, and delete their posts. What's more, image uploads with posts add a personalized touch to every user's feed.

    ![Post functionality](https://github.com/MudassarMemon/Officebook/blob/main/storage/chrome_Mkpye07gLa.gif)

```javascript
      <div className="create-profile-post">
        <Link to={`/users/${sessionUser?.id}`}>
          <img id="userIcon" alt="userLogo" src={sessionUser?.avatarUrl}></img>
        </Link>

        <button
          onClick={() => {
            setShowCreateModal(true);
          }}
        >
          {user && sessionUser && user.id === sessionUser.id
            ? "What's on your mind?"
            : `Write something to ${user.firstName}...`}
        </button>

        {showCreateModal && (
          <Modal onClose={() => setShowCreateModal(false)}>
            <PostForm onClose={() => setShowCreateModal(false)} user={user} />
          </Modal>
        )}
      </div>
```
