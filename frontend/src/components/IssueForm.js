import React, { useState } from 'react';
import axios from 'axios';
import './IssueForm.css';

const bengaluruWards = [
  'Basavanagudi', 'Jayanagar', 'Malleshwaram', 'Rajajinagar', 'Shivajinagar', 'Indiranagar', 'Koramangala', 'Whitefield', 'Yelahanka', 'Hebbal', 'BTM Layout', 'Vijayanagar', 'Padmanabhanagar', 'Chickpet', 'Gandhinagar', 'Other'
];

function IssueForm() {
  const [formData, setFormData] = useState({
    area: '',
    title: '',
    description: '',
    name: '',
    contact: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(files[0]);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    if (!formData.image) {
      setError('Please upload an image to submit your issue.');
      setLoading(false);
      return;
    }
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      await axios.post('http://localhost:5000/api/issues', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess('Your issue has been submitted to your MLA!');
      setFormData({ area: '', title: '', description: '', name: '', contact: '', image: null });
      setImagePreview(null);
    } catch (err) {
      setError('Failed to submit. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="issueform-outer">
      <form className="issueform-card" onSubmit={handleSubmit}>
        <h1 className="form-heading">Report an Issue in Bengaluru</h1>
        <p className="form-subtitle">Help your neighborhood by reporting civic problems directly to your MLA.</p>
        <div className="form-group">
          <label>Area/Ward
            <select name="area" value={formData.area} onChange={handleChange} required>
              <option value="">Select Area/Ward</option>
              {bengaluruWards.map(ward => <option key={ward} value={ward}>{ward}</option>)}
            </select>
          </label>
          <label>Issue Title
            <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="E.g. Pothole on 5th Main" />
          </label>
        </div>
        <div className="form-group">
          <label>Description
            <textarea name="description" value={formData.description} onChange={handleChange} required placeholder="Describe the issue in detail..." />
          </label>
        </div>
        <div className="form-group">
          <label>Your Name
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>Contact Info
            <input type="text" name="contact" value={formData.contact} onChange={handleChange} required placeholder="Email or phone" />
          </label>
        </div>
        <div className="form-group image-upload-group">
          <label>Upload Image (optional)
            <input type="file" name="image" accept="image/*" onChange={handleChange} />
          </label>
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>{loading ? 'Submitting...' : 'Submit Issue'}</button>
        {success && <div className="success-msg">{success}</div>}
        {error && <div className="error-msg">{error}</div>}
      </form>
    </div>
  );
}

export default IssueForm;
