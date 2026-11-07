"use client";

import { Star, Check, X, MessageSquare } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function AdminReviews() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0A1628]">Reviews & Feedback</h1>
        <p className="text-gray-500 text-sm mt-1">Manage guest reviews and testimonials</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
          <p className="text-4xl font-bold text-[#C9A96E]">4.8</p>
          <div className="flex justify-center gap-0.5 my-2">
            {[1,2,3,4,5].map((i) => <Star key={i} className={`w-4 h-4 ${i <= 4 ? "text-[#C9A96E] fill-[#C9A96E]" : "text-[#C9A96E]/30 fill-[#C9A96E]/30"}`} />)}
          </div>
          <p className="text-xs text-gray-500">Average Rating</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
          <p className="text-4xl font-bold text-[#0A1628]">{testimonials.length}</p>
          <p className="text-xs text-gray-500 mt-2">Total Reviews</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
          <p className="text-4xl font-bold text-green-600">{testimonials.filter(t => t.rating >= 4).length}</p>
          <p className="text-xs text-gray-500 mt-2">Positive (4-5★)</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
          <p className="text-4xl font-bold text-blue-600">3</p>
          <p className="text-xs text-gray-500 mt-2">Pending Review</p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {testimonials.map((review) => (
          <div key={review.id} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#0A1628] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {review.guestName.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-semibold text-[#0A1628]">{review.guestName}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-[#C9A96E] fill-[#C9A96E]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">{review.guestTitle} • {review.date}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{review.content}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg" title="Approve">
                  <Check className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Reject">
                  <X className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="Reply">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

