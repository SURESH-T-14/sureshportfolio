import { useChapterVisible } from '../../hooks/useChapterVisible';

interface VisibilityGateProps {
  id: string;
  children: React.ReactNode;
}

/** Wraps a chapter's 3D content so it only actually draws when scrolled near it — see useChapterVisible. */
const VisibilityGate: React.FC<VisibilityGateProps> = ({ id, children }) => {
  const visible = useChapterVisible(id);
  return <group visible={visible}>{children}</group>;
};

export default VisibilityGate;
