import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card, CardFooter } from "@/components/ui/card";
import TradeStore from "@/store/TradeStore";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const TableComponent = () => {
  const {
    TradeList,
    TradeListRequest,
    UpdateTradeRequest,
    RemoveTradeRequest,
    CreateTradeRequest,
  } = TradeStore();
  const [editing, setEditing] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRows, setCurrentRows] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  const rowsPerPage = 20;

  useEffect(() => {
    (async () => {
      await TradeListRequest();
    })();
  }, []);

  const handleEdit = (row) => {
    setEditing(row._id);
    setEditedRow({ ...row });
  };

  const handleChange = (e, key) => {
    setEditedRow({ ...editedRow, [key]: e.target.value });
  };

  const handleSave = async () => {
    const { date, trade_code, high, low, open, close, volume } = editedRow;
    if (!date || !trade_code || !high || !low || !open || !close || !volume) {
      toast.error("Please fill all field");
    } else {
      let res = await UpdateTradeRequest(editedRow, editing);
      if (res) {
        setEditing(null);
        toast.success(
          "This may take some time to update table data. Please wait !"
        );
        await TradeListRequest();
        toast.success("Successfully Updated");
      }
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          let res = await RemoveTradeRequest(id);
          if (res) {
            Swal.fire({
              title: "Deleted!",
              text: "Your data has been deleted.",
              icon: "success",
            });
            toast.success(
              "This may take some time to update table data. Please wait !"
            );
            setCurrentPage(1);
            await TradeListRequest();
          } else {
            toast.error("Something went wrong!");
          }
        })();
      }
    });
  };

  const handleAdd = async () => {
    const { date, trade_code, high, low, open, close, volume } = editedRow;
    if (!date || !trade_code || !high || !low || !open || !close || !volume) {
      toast.error("Please fill all field");
    } else {
      let res = await CreateTradeRequest(editedRow);
      if (res) {
        setCurrentPage(1);
        setEditedRow({});
        setEditing(null);
        toast.success("Successful");
        await TradeListRequest();
      }
    }
  };

  useEffect(() => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    if (TradeList !== null) {
      setCurrentRows(TradeList.slice(indexOfFirstRow, indexOfLastRow));
      setTotalPages(Math.ceil(TradeList.length / rowsPerPage));
    }
  }, [TradeList, currentPage]);

  return (
    <>
      <div className="flex items-center justify-center m-6">
        <Dialog>
          <DialogTrigger
            variant="default"
            className="h-9 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary/90 text-primary-foreground shadow hover:bg-primary/80"
          >
            Add new
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add </DialogTitle>
              <DialogDescription>
                Add a new data to the table.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date">Date</Label>
                <Input
                  type="text"
                  id="date"
                  value={editedRow.date}
                  onChange={(e) => handleChange(e, "date")}
                  className="col-span-3"
                  placeholder="2020-08-10"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="trade_code">Trade Code</Label>
                <Input
                  type="text"
                  id="trade_code"
                  value={editedRow.trade_code}
                  onChange={(e) => handleChange(e, "trade_code")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="high">High</Label>
                <Input
                  type="text"
                  id="high"
                  value={editedRow.high}
                  onChange={(e) => handleChange(e, "high")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="low">low</Label>
                <Input
                  type="text"
                  id="low"
                  value={editedRow.low}
                  onChange={(e) => handleChange(e, "low")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="open">Open</Label>
                <Input
                  type="text"
                  id="open"
                  value={editedRow.open}
                  onChange={(e) => handleChange(e, "open")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="close">Close</Label>
                <Input
                  type="text"
                  id="close"
                  value={editedRow.close}
                  onChange={(e) => handleChange(e, "close")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="volume">Volume</Label>
                <Input
                  type="text"
                  id="volume"
                  value={editedRow.volume}
                  onChange={(e) => handleChange(e, "volume")}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAdd}>
                Save{" "}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Card className="w-[95vw] mt-6 mb-16 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="ps-6">Date</TableHead>
              <TableHead>Trade Code</TableHead>
              <TableHead>High</TableHead>
              <TableHead>Low</TableHead>
              <TableHead>Open</TableHead>
              <TableHead>Close</TableHead>
              <TableHead>Volume</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRows &&
              currentRows.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="ps-6">
                    {editing === item._id ? (
                      <Input
                        value={editedRow.date}
                        onChange={(e) => handleChange(e, "date")}
                      />
                    ) : (
                      item.date
                    )}
                  </TableCell>
                  <TableCell>
                    {editing === item._id ? (
                      <Input
                        value={editedRow.trade_code}
                        onChange={(e) => handleChange(e, "trade_code")}
                      />
                    ) : (
                      item.trade_code
                    )}
                  </TableCell>
                  <TableCell>
                    {editing === item._id ? (
                      <Input
                        value={editedRow.high}
                        onChange={(e) => handleChange(e, "high")}
                      />
                    ) : (
                      item.high
                    )}
                  </TableCell>
                  <TableCell>
                    {editing === item._id ? (
                      <Input
                        value={editedRow.low}
                        onChange={(e) => handleChange(e, "low")}
                      />
                    ) : (
                      item.low
                    )}
                  </TableCell>
                  <TableCell>
                    {editing === item._id ? (
                      <Input
                        value={editedRow.open}
                        onChange={(e) => handleChange(e, "open")}
                      />
                    ) : (
                      item.open
                    )}
                  </TableCell>
                  <TableCell>
                    {editing === item._id ? (
                      <Input
                        value={editedRow.close}
                        onChange={(e) => handleChange(e, "close")}
                      />
                    ) : (
                      item.close
                    )}
                  </TableCell>
                  <TableCell>
                    {editing === item._id ? (
                      <Input
                        value={editedRow.volume}
                        onChange={(e) => handleChange(e, "volume")}
                      />
                    ) : (
                      item.volume
                    )}
                  </TableCell>
                  <TableCell>
                    {editing === item._id ? (
                      <Button onClick={handleSave} variant="outline">
                        Save
                      </Button>
                    ) : (
                      <div className="flex space-x-3">
                        <Button
                          onClick={() => handleEdit(item)}
                          variant="default"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(item._id)}
                          className="bg-rose-400 hover:bg-rose-500"
                        >
                          <MdDelete />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <div
          className={`h-[50vh] w-full flex items-center justify-center ${
            TradeList === null ? "" : "hidden"
          }`}
        >
          {TradeList === null ? (
            <>
              <Button
                disabled=""
                type="button"
                className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
                Loading...
              </Button>
            </>
          ) : (
            <span></span>
          )}
        </div>

        <CardFooter className="flex justify-between items-center p-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="outline"
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            variant="outline"
          >
            Next
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default TableComponent;
