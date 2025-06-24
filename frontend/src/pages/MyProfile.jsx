import React, { useState } from 'react';
import './MyProfile.css';
import placeholderImage from '../assets/pfp.png'; // Replace with your own image

const MyProfile = () => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    username: 'JohnDoe',
    email: 'john@example.com',
    dob: '2000-01-01',
    about: 'I enjoy cooking healthy meals and exploring new recipes.',
    allergies: ['Peanuts', 'Shellfish']
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleAllergyChange = (index, value) => {
    const updated = [...profile.allergies];
    updated[index] = value;
    setProfile({ ...profile, allergies: updated });
  };

  const addAllergy = () => {
    setProfile({ ...profile, allergies: [...profile.allergies, ''] });
  };

  const removeAllergy = (index) => {
    const updated = profile.allergies.filter((_, i) => i !== index);
    setProfile({ ...profile, allergies: updated });
  };

  const toggleEdit = () => setEditing(!editing);

  return (
    <div className="profile-full">
      <h2 className="profile-title">PROFILE</h2>

      <div className="profile-flex">
        {/* Left Side */}
        <div className="profile-left">
          <img src={placeholderImage} alt="Avatar" className="avatar" />
          <button className="upload-btn">Upload Picture</button>

          <div className="allergy-section">
            <h4>Allergies</h4>
            {editing ? (
              <>
                {profile.allergies.map((item, idx) => (
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
                {profile.allergies.map((item, idx) => (
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

          <label>Date of Birth:</label>
          {editing ? (
            <input type="date" name="dob" value={profile.dob} onChange={handleChange} className="input" />
          ) : (
            <p className="readonly">{profile.dob}</p>
          )}

          <label>About Me:</label>
          {editing ? (
            <textarea name="about" value={profile.about} onChange={handleChange} className="input" />
          ) : (
            <p className="readonly">{profile.about}</p>
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


