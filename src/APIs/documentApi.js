import axios from "axios";

const API_BASE_URL = "http://localhost:8800/api/documents"; // adjust as needed

export const uploadDocument = async ({ name, file }) => {
    try {
        const formData = new FormData();
        formData.append("file", file);       // file
        formData.append("name", name);       // optional, if your API needs it

        const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true, // if you need cookies/session
        });

        return response.data;
    } catch (error) {
        console.error("Error uploading document:", error);
        throw error;
    }
};
export const getAllDocuments = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/owner`, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getDocumentById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`, { withCredentials: true });
        console.log("Fetched document:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching document:", error);
        throw error;
    }
}

export const deleteDocumentById = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const updateDocumentById = async (id, userId, content) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/${id}`,
            { userId, content },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const shareDocument = async (id, viewUserIds = [], editUserIds = []) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/${id}/share`,
            {
                viewUserIds,
                editUserIds
            },
            {
                withCredentials: true,
            }
        );
        console.log("Share response:", response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};