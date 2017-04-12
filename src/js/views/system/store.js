import Immutable from 'immutable';

export default Immutable.fromJS({
    system: {
        userId: window.userId,
        rewardPoints: window.rewardPoints,
        phone: window.phone,
        loginType: window.loginType
    }
})