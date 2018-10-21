/* Firebase data structure

{
  products: {
    one: {
      name: product name,
      price,
      pic: product pictures for the product card,
      pictures: { // pictures for picture slideshow in itemdetail page ordered by key
        1: pic1,
        2: pic2,
        ...
      }
      condition: New/ Used/ Parts/ Refurb?,
      type: Tablet/ any type that they want to add
      category,
      location: selling location,
      description: product description,
      including: {
        1: what is included with the product/ service
      }
      isAvailable: boolean,
      uid: firebaseUid,
      user: username,
      timestamp,
    },
    two: {
      ...
    },
    ...
  },
  users: {
    one: {
      name,
      surname,
      dob: date of birth
      email: uni-email,
      pic: profile pic,
      preferedPlace,
      university,
      idCardPic,
      followingCount: number of following,
      followerCount: number of followers,
      timestamp,
      group: {
        groupA: true,
        groupB: true,
      },
    }
  },
  productsByOwner: {
    userId: {
      productIdOne: {
        name,
        pic,
        price,
      },
      productIdTwo
    }
  }
  wishlist: {
    userId: {
      productIdOne: {
        name,
        pic,
        price,
        timeStamp,
      },
      productIdTwo
    }
  },
  orders: {
    userId: {
      productIdOne: {
        name,
        pic,
        price,
        timeStamp,
        status: Requested, Accepted, Purchased,
        sellerId:,
        sellerUsername
      },
      productIdTwo
    }
  },
  recent search: {
    userId: {
      productIdOne: {
        name,
        pic,
        price,
        timeStamp,
      },
      productIdTwo
    }
  },
  following: {
    userId: {
      followingUserIdOne: true
      followingUserIdTwo: true
    }
  },
  follower: {
    userId: {
      followerUserIdOne: true
      followerUserIdTwo: true
    }
  },
  group: {
    
  },
  feedback: {
    userIdOne: {
      countFeedback: number of feedbacks
      rating: average rating
      feedbackId: {
        productName,
        productId,
        rating: 
        note: 
        buyerUsername, // a better name please
        buyerId
      }
    }
  },
  popularSearch: {
    id: {
      searchName,
      searchCount,
    }
  }
  chats: {
    chatIdOne: {
      title: chat title,
      lastMessage,
      timestamp,
    },
    chatIdTwo,
  },
  messages: {
    chatIdOne: {
      messageIdOne: {
        name: sender name,
        message,
        timestamp
      },
      messageIdTwo,
    },
    chatIdTwo,
  }
}

*/
