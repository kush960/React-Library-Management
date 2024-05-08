import newRequest from "../utils/newRequest";

export const approveBookService = async (data) => {
    try {
        const { studentId, ...rest } = data;
        const response = await newRequest.get(
            `users/${studentId}`
        );
        let userData = response.data;
        userData.issuedBooks.push(rest);
       
        await newRequest.put(`users/${studentId}`, userData);
        await newRequest.delete(`requests/${data.id}`);
        return 1;
    }
    catch (error) {
        console.error("error msg is::", error.message);
        return 0;
    }

}
export const issueBookService = async (data) => {
    try {
        const { studentId, ...rest } = data;
        const response = await newRequest.get(
            `users/${studentId}`
        );
        let userData = response.data;
        userData.issuedBooks.push(rest);
       
        await newRequest.put(`users/${studentId}`, userData);
        return 1;
    }
    catch (error) {
        console.error("error msg is::", error.message);
        return 0;
    }

}