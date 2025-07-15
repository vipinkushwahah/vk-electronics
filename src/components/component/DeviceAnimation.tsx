import { motion } from 'framer-motion';
import '../styles/global.scss';

export default function DeviceAnimation() {
  return (
    <motion.div
      className="device-animation"
      animate={{ x: [0, 50, -50, 0] }}
      transition={{ repeat: Infinity, duration: 8 }}
    >
      📱 💻
    </motion.div>
  );
}
