const Issue = require('../models/Issue');

exports.createIssue = async (req, res) => {
  try {
    console.log('Received issue submission:', req.body);
    console.log('File:', req.file);

    // Extract required fields
    const { area, title, description, name, contact, lat, lng } = req.body;
    if (!area || !title || !description || !name || !contact) {
      return res.status(400).json({ message: 'All fields (area, title, description, name, contact) are required.' });
    }
    const imageUrl = req.file ? req.file.filename : "";
    if (!imageUrl) {
      return res.status(400).json({ message: 'Image is required.' });
    }

    console.log('Creating new issue with:', { area, title, description, name, contact, imageUrl, location: { lat, lng } });

    const newIssue = new Issue({
      area,
      title,
      description,
      name,
      contact,
      imageUrl,
      location: { lat, lng }
    });

    const savedIssue = await newIssue.save();
    console.log('Issue saved successfully:', savedIssue);

    res.status(201).json(savedIssue);
  } catch (error) {
    console.error('Error creating issue:', error);
    res.status(500).json({ message: 'Error creating issue', error: error.message });
  }
};

exports.getAllIssues = async (req, res) => {
  try {
    console.log('Fetching all issues');
    const issues = await Issue.find();
    console.log(`Found ${issues.length} issues`);
    res.json(issues);
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({ message: 'Error fetching issues', error: error.message });
  }
};

exports.updateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['Pending', 'Solved'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }
    const updated = await Issue.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Issue not found.' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error: error.message });
  }
};
