import React, { Component} from 'react';

class SearchData extends Component {
    /*
    firebaseDB.ref("human")
            .orderByChild("email")
            .equalTo("test@apple.com")
            .on('value', function (snapshot) {
                if (snapshot.val() === null) {
                    console.log('Email is not present');
                }else{
                    console.log('Email is present');
                    var key = snapshot.key;
                    var childData = snapshot.val();
                    //Your Code goes Here
                }
            });

            */

render() {
    return (
    <div>search</div>
    )
    }
}

export default SearchData;
