import { useEffect, useState } from 'react';
import './MyProfile.css';
import { localStorage } from "../utils/localStorage";

const MyProfile = () => {
  const [editing, setEditing] = useState(false);
  // Initialize profile with a default structure
  const [profile, setProfile] = useState({
    id: null,
    username: '',
    email: '',
    password: '', // Consider if password should be in state
    login_type: '',
    allergy: [],
    about_me: '',
    img: 'https://example.com/default-profile.jpg' // Default image
  });
  const [loading, setLoading] = useState(true);

  const profileId = localStorage.get('id'); // later change to the user token

  useEffect(() => {
    // Replace with your backend URL and port if different
    fetch(`${import.meta.env.VITE_API_LINK}/GETprofile/${profileId}`)
    // fetch(`http://localhost:8080/GETprofile/${profileId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.profile && data.profile.length > 0) {
          // Set profile to the first element of the returned array
          setProfile(data.profile[0]);
        } else {
          console.error('Failed to fetch profile or profile not found:', data);
          // Handle case where profile is not found, maybe redirect to login or show error
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        setLoading(false);
        // Handle fetch error
      });
  }, [profileId]); // Add profileId to dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleAllergyChange = (index, value) => {
    const updated = [...profile.allergy]; // Use profile.allergy as per backend response
    updated[index] = value;
    setProfile({ ...profile, allergy: updated }); // Update profile.allergy
  };

  const addAllergy = () => {
    setProfile({ ...profile, allergy: [...profile.allergy, ''] }); // Use profile.allergy
  };

  const removeAllergy = (index) => {
    const updated = profile.allergy.filter((_, i) => i !== index); // Use profile.allergy
    setProfile({ ...profile, allergy: updated }); // Update profile.allergy
  };

  const toggleEdit = () => setEditing(!editing);

  // Render loading state or profile data
  if (loading) {
    return <div className="profile-full">Loading Profile...</div>;
  }

  // Add a check if profile data is available before rendering details
  if (!profile || !profile.id) {
      return <div className="profile-full">Profile not found or failed to load.</div>;
  }

  return (
    <div className="profile-full">
      <h1 className="profile-title">PROFILE</h1>

      <div className="profile-flex">
        {/* Left Side */}
        <div className="profile-left">
          <img src={profile.img} alt="Avatar" className="avatar" />
          <button className="upload-btn">Upload Picture</button>

          <div className="allergy-section">
            <h4>Allergies</h4>
            {editing ? (
              <>
                {/* Ensure profile.allergy is an array before mapping */}
                {Array.isArray(profile.allergy) && profile.allergy.map((item, idx) => (
                  <div key={idx} className="allergy-row">
                    <input
                      value={item}
                      onChange={(e) => handleAllergyChange(idx, e.target.value)}
                      className="input"
                    />
                    <button className="remove-btn" onClick={() => removeAllergy(idx)}>Remove</button>
                  </div>
                ))}
                <button className="add-btn" onClick={addAllergy}>Add Allergy</button>
              </>
            ) : (
              <ul>
                 {/* Ensure profile.allergy is an array before mapping */}
                {Array.isArray(profile.allergy) && profile.allergy.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="profile-right">
          <label>Username:</label>
          {editing ? (
            <input name="username" value={profile.username} onChange={handleChange} className="input" />
          ) : (
            <p className="readonly">{profile.username}</p>
          )}

          <label>Email:</label>
          {editing ? (
            <input name="email" value={profile.email} onChange={handleChange} className="input" />
          ) : (
            <p className="readonly">{profile.email}</p>
          )}
          <label>About Me:</label>
          {editing ? (
            <textarea name="about_me" value={profile.about_me} onChange={handleChange} className="input" />
          ) : (
            <p className="readonly">{profile.about_me}</p>
          )}

          <button className="update-btn" onClick={toggleEdit}>
            {editing ? 'Save Information' : 'Update Information'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;


