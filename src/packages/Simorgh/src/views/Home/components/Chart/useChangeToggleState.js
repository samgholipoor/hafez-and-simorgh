import { useEffect, useState } from 'react';

export default function useChangeToggleState(nodes) {
  const [isShiftKey, setIsShftkey] = useState(false);

  function changeToggleState(node) {
    if (isShiftKey) {
      node.set('toggleKey', 'disabled');
    } else {
      node.set('toggleKey', 'none');
    }
  }

  useEffect(() => {
    if (nodes) {
      nodes.nodes.each(changeToggleState);
    }
  }, [isShiftKey]);

  const setActiveShiftKey = (e) => {
    if (e.shiftKey) {
      setIsShftkey(true);
    }
  };
  const setPassiveShiftKey = () => {
    setIsShftkey(false);
  };

  useEffect(() => {
    window.addEventListener('keydown', setActiveShiftKey);
    window.addEventListener('keyup', setPassiveShiftKey);

    return () => {
      window.removeEventListener('keydown', setActiveShiftKey);
      window.removeEventListener('keyup', setPassiveShiftKey);
    };
  }, []);

  return null;
}
