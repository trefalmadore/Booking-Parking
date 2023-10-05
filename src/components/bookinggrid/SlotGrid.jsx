import React, { useState } from 'react';

function SlotGrid({ onSlotClick }) {
  const slots = Array(18).fill(null).map((_, index) => `Slot ${index + 1}`);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlotClick = (slot, index) => {
    if (!selectedSlot) {
      setSelectedSlot(index + 1);
      onSlotClick(index + 1);
    }
  };

  return (
      <div className="slot-grid-container">
        {slots.map((slot, index) => (
            <div
                key={index}
                className={`slot-grid-item ${selectedSlot === index + 1 ? 'selected' : ''}`}
                onClick={() => handleSlotClick(slot, index)}
            >
              {slot}
            </div>
        ))}
      </div>
  );
}

export default SlotGrid;
