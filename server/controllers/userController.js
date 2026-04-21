import User from "../models/User.js";

export const getUserDetails = async (req, res) => {
    const user_id = req.body.user_id;
    const user = await User.findOne({ userid: user_id }).select('-password');
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
}
