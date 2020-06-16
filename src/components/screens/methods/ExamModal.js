import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import qs from "query-string";
import Pagination from "@material-ui/lab/Pagination";

import { getExams } from "../../../store/actions/examActions";

import Sidemenu from "../../UI/sidemenu/Sidemenu";
import Modal from "../../UI/modal/Modal";
import ListItemWithSelect, { SubItems } from "../../UI/list/ListItemWithSelect";

import Filter from "./Filter";

const orderbyValues = [
  { key: 1, text: "پیش فرض", value: "id" },
  { key: 2, text: "کد", value: "code" },
  { key: 3, text: "نام", value: "name" },
];

const orderValues = [
  { key: 1, text: "صعودی", value: "asc" },
  { key: 2, text: "نزولی", value: "desc" },
];

const ExamModal = (props) => {
  const [pageInfo, setPageInfo] = useState({ totalPages: 0, page: 1 });
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    name: "",
    code: "",
    orderby: orderbyValues[0].value,
    order: orderValues[0].value,
  });

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, [pageInfo.page, props.open]);

  const loadData = async () => {
    const results = await props.getExams(qs.stringify({ ...filter, page: pageInfo.page - 1 }));
    if (results) {
      setData(results.rows);
      setPageInfo((oldState) => {
        return { ...oldState, totalPages: results.totalPages };
      });
    }
  };

  const selectExam = (index) => {
    props.setSelected(data[index]);
    props.setOpen(false);
  };

  // Handle page change
  const handlePageChange = (event, value) => {
    setPageInfo({ ...pageInfo, page: value });
  };

  return (
    <Modal
      open={props.open}
      title="انتخاب آزمون"
      cancel={() => {
        props.setOpen(false);
      }}
    >
      <div className="page-wrapper">
        <Sidemenu>
          <Filter orderValues={orderValues} orderbyValues={orderbyValues} filter={filter} setFilter={setFilter} loadData={loadData} />
        </Sidemenu>
        <div className="page-content">
          <div className="px-2" style={{ maxHeight: "400px", overflowY: "auto" }}>
            {data.map((item, index) => {
              return (
                <ListItemWithSelect
                  key={item.id}
                  id={item.id}
                  onClick={() => {
                    selectExam(index);
                  }}
                  title = "انتخاب"
                >
                  <SubItems key={item.id} data={["کد آزمون", item.code, "نام آزمون", item.name]} />
                </ListItemWithSelect>
              );
            })}
          </div>

          <div>
            <Pagination
              className="pagination"
              count={pageInfo.totalPages}
              variant="outlined"
              shape="rounded"
              style={{ textAlign: "center" }}
              showFirstButton
              showLastButton
              siblingCount={0}
              page={pageInfo.page}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

ExamModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default connect(null, { getExams })(ExamModal);
