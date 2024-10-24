import Button from "./components/Button";

interface HeaderTypes {
  onClickBack: () => void;
  onClickRestart: () => void;
  hitScores: number;
}

const Header = ({ onClickBack, onClickRestart, hitScores }: HeaderTypes) => {
  return (
    <div className="fixed top-0 left-0 z-10 w-full h-12 px-4 py-1 bg-gray-100 shadow-xl">
      <div className="grid items-center grid-cols-3">
        <div className="">
          <Button className="text-sm " onClick={onClickBack}>
            Назад
          </Button>
        </div>
        <div className="col-start-2">
          <Button className="text-sm " onClick={onClickRestart}>
            Заново
          </Button>
        </div>
        <div className="col-start-3">
          <div className="">Ходов: {hitScores}</div>
        </div>
      </div>
    </div>
  );
};
export default Header;
