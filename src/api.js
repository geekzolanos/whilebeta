async function getCoursesByUser(firestore, user) {
    const userRef = firestore.collection('users').doc(user.uid);

    const snapshot = await firestore.collection('courses')
        .where('students', 'array-contains', userRef)
        .get();
        
    const courses = snapshot.docs.map(async (doc) => {
        const data = Object.assign({id: doc.id, doc}, doc.data());
        data.id = doc.id;
        
        const teacher = await data.teacher.get();            
        data.teacher = teacher.data();
        return data;
    });

    return await Promise.all(courses);
}

async function getTopicsByCourse(firestore, course) {
    const snapshot = await firestore.collection('topics')
        .where('course', '==', course.doc.ref)
        .orderBy('createdAt', 'desc')
        .get();
        
    return snapshot.docs.map(doc => {
        const data = Object.assign({id: doc.id, doc}, doc.data());
        return data;
    });
}

export { getCoursesByUser, getTopicsByCourse };