import { create } from "zustand";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const TradeStore = create((set) => ({
  CreateTradeRequest: async (reqBody) => {
    try {
      let res = await axios.post(`${BASE_URL}/api/create-trade`, reqBody, {
        withCredentials: true,
      });
      return res.data["status"] === "success";
    } catch (error) {
      console.log(error);
    }
  },
  UpdateTradeRequest: async (reqBody, id) => {
    try {
      let res = await axios.post(
        `${BASE_URL}/api/update-trade/${id}`,
        reqBody,
        { withCredentials: true }
      );
      return res.data["status"] === "success";
    } catch (error) {
      console.log(error);
    }
  },
  RemoveTradeRequest: async (id) => {
    try {
      let res = await axios.get(`${BASE_URL}/api/delete-trade/${id}`, {
        withCredentials: true,
      });
      set({ TradeList: null });
      return res.data["status"] === "success";
    } catch (error) {
      console.log(error);
    }
  },
  ReadTradeDataRequest: async (id) => {
    try {
      let res = await axios.get(`${BASE_URL}/api/read-trade/${id}`, {
        withCredentials: true,
      });
      return res.data["status"] === "success";
    } catch (error) {
      console.log(error);
    }
  },

  TradeList: null,
  TradeListRequest: async () => {
    try {
      let res = await axios.get(`${BASE_URL}/api/read-all-trade`, {
        withCredentials: true,
      });
      set({ TradeList: res.data["data"] });
      return res.data["status"] === "success";
    } catch (error) {
      console.log(error);
    }
  },
}));

export default TradeStore;
