"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash2, BedDouble, Eye, X, Loader2 } from "lucide-react";
import { rooms as initialRooms } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { Room } from "@/types";

export default function AdminRooms() {
  const [roomList, setRoomList] = useState<Room[]>(initialRooms);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [loading, setLoading] = useState(false);

  const [newRoom, setNewRoom] = useState({
    name: "",
    category: "Deluxe",
    price: "",
    size: "45 sqm / 484 sq ft",
    bedType: "King",
    maxOccupancy: 2,
    floor: "4th Floor",
    view: "City View",
    description: "",
  });

  useEffect(() => {
    fetch("/api/rooms")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.rooms) {
          setRoomList(data.rooms);
        }
      })
      .catch(() => {});
  }, []);

  const handleSaveRoom = async () => {
    if (!newRoom.name || !newRoom.price) {
      alert("Room name and price are required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRoom),
      });
      const data = await res.json();
      if (data.success) {
        setRoomList([data.room, ...roomList]);
        setShowModal(false);
        setNewRoom({
          name: "",
          category: "Deluxe",
          price: "",
          size: "45 sqm / 484 sq ft",
          bedType: "King",
          maxOccupancy: 2,
          floor: "4th Floor",
          view: "City View",
          description: "",
        });
      } else {
        alert(data.error || "Failed to save room");
      }
    } catch {
      alert("Error saving room");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRoom = (id: string) => {
    if (confirm("Are you sure you want to remove this room?")) {
      setRoomList(roomList.filter((r) => r.id !== id));
    }
  };

  const filteredRooms = roomList.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "All Categories" ||
      r.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1628]">Room Management</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage all hotel suites, pricing, and live availability
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#C9A96E] text-[#0A1628] px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#D4BC8E] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Room
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search rooms by name, floor, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A96E]"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]"
          >
            <option>All Categories</option>
            <option>Deluxe</option>
            <option>Premier</option>
            <option>Suite</option>
          </select>
        </div>
      </div>

      {/* Rooms Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Room</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Bed Type</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4">Price/Night</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRooms.map((room, i) => (
                <motion.tr
                  key={room.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-gray-50/50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0A1628] to-[#152238] rounded-lg flex items-center justify-center flex-shrink-0">
                        <BedDouble className="w-5 h-5 text-[#C9A96E]/40" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0A1628]">{room.name}</p>
                        <p className="text-xs text-gray-400">
                          Floor: {room.floor} • View: {room.view}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-[#C9A96E]/10 text-[#C9A96E] px-2.5 py-1 rounded-full font-medium">
                      {room.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{room.bedType}</td>
                  <td className="px-6 py-4 text-gray-600">{room.size}</td>
                  <td className="px-6 py-4 font-semibold text-[#0A1628]">
                    {formatCurrency(room.price)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wide ${
                        room.isAvailable
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {room.isAvailable ? "Available" : "Occupied"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteRoom(room.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Room Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-[#0A1628]">Add New Room / Suite</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">Room Name *</label>
                  <input
                    value={newRoom.name}
                    onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]"
                    placeholder="e.g., Royal Ocean Penthouse"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">Category *</label>
                  <select
                    value={newRoom.category}
                    onChange={(e) => setNewRoom({ ...newRoom, category: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]"
                  >
                    <option>Deluxe</option>
                    <option>Premier</option>
                    <option>Suite</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">
                    Price per Night (₹) *
                  </label>
                  <input
                    type="number"
                    value={newRoom.price}
                    onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]"
                    placeholder="35000"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">Room Size</label>
                  <input
                    value={newRoom.size}
                    onChange={(e) => setNewRoom({ ...newRoom, size: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]"
                    placeholder="75 sqm / 807 sq ft"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">Bed Type</label>
                  <select
                    value={newRoom.bedType}
                    onChange={(e) => setNewRoom({ ...newRoom, bedType: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]"
                  >
                    <option>King</option>
                    <option>Twin</option>
                    <option>Queen</option>
                    <option>King / Twin</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">Floor</label>
                  <input
                    value={newRoom.floor}
                    onChange={(e) => setNewRoom({ ...newRoom, floor: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]"
                    placeholder="10th Floor"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">View</label>
                  <input
                    value={newRoom.view}
                    onChange={(e) => setNewRoom({ ...newRoom, view: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]"
                    placeholder="Panoramic Bay of Bengal & Marina Promenade"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1.5 block">Description</label>
                <textarea
                  rows={3}
                  value={newRoom.description}
                  onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E] resize-none"
                  placeholder="Lavish decor, marble soaking tub, 24/7 personal butler service..."
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRoom}
                disabled={loading}
                className="px-5 py-2.5 text-sm bg-[#C9A96E] text-[#0A1628] font-semibold rounded-lg hover:bg-[#D4BC8E] transition-colors flex items-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Saving..." : "Save Room"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
